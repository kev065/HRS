from app import create_app
from models import db, Employee, Manager, HR_Personel, EmployeeProfile, ManagerProfile, HrProfile, Remuneration, RemunerationDescription, Experience, Session, Goals, Training, EmployeeTraining, Leave, LeaveApproval, Documents, Education, Department
from datetime import datetime, timedelta
import uuid
import random

app = create_app()
app.app_context().push()

def generate_uuid():
    return str(uuid.uuid4())

# Clear the database
db.drop_all()
db.create_all()

# Create managers
managers = []
for i in range(3):
    manager = Manager(id=generate_uuid(), email=f'manager{i}@example.com', password='password')
    db.session.add(manager)
    managers.append(manager)

# Create departments
departments = ['HR', 'Sales', 'Marketing', 'Engineering']
for i, dept in enumerate(departments):
    department = Department(id=generate_uuid(), name=dept, dept_head=managers[i % len(managers)].id)
    db.session.add(department)

    # Update manager with department id
    managers[i % len(managers)].dept_id = department.id


# Create employees
for i in range(10):
    employee = Employee(id=generate_uuid(), email=f'employee{i}@example.com', password='password', dept_id=department.id)
    db.session.add(employee)


# Create HR personnel
for i in range(2):
    hr_personnel = HR_Personel(id=generate_uuid(), email=f'hr{i}@example.com', password='password', dept_id=department.id)
    db.session.add(hr_personnel)


# Hardcoded names
first_names = ['Makmende', 'Jane', 'Will', 'Iam', 'Charlie', 'Emily']
last_names = ['Izbak', 'Njiru', 'Robya', 'Back', 'Day', 'Sungu']

# Create EmployeeProfile, ManagerProfile, and HrProfile
for i, employee in enumerate(Employee.query.all()):
    profile = EmployeeProfile(id=generate_uuid(), date_of_birth=datetime.utcnow(), employee_id=employee.id, first_name=first_names[i % len(first_names)], last_name=last_names[i % len(last_names)], mantra='Live and let live', phone_contact=254720123456, profile_photo='path/to/photo', title='Employee', date_joined=datetime.utcnow(), date_created=datetime.utcnow())
    db.session.add(profile)

for i, manager in enumerate(Manager.query.all()):
    profile = ManagerProfile(id=generate_uuid(), date_of_birth=datetime.utcnow(), manager_id=manager.id, first_name=first_names[i % len(first_names)], last_name=last_names[i % len(last_names)], mantra='Live and let live', phone_contact=254721123456, profile_photo='path/to/photo', title='Manager', date_joined=datetime.utcnow(), date_created=datetime.utcnow())
    db.session.add(profile)

for i, hr_personnel in enumerate(HR_Personel.query.all()):
    profile = HrProfile(id=generate_uuid(), date_of_birth=datetime.utcnow(), hr_id=hr_personnel.id, first_name=first_names[i % len(first_names)], last_name=last_names[i % len(last_names)], mantra='Live and let live', phone_contact=254734987654, profile_photo='path/to/photo', title='HR', date_joined=datetime.utcnow(), date_created=datetime.utcnow())
    db.session.add(profile)


# Defines a list of potential remuneration types and descriptions
remuneration_types = ['deduction', 'bonus', 'allowance', 'normal']
remuneration_descriptions = ['Salary deduction due to absence', 'Performance bonus', 'Commuter allowance', 'Monthly salary']

for employee in Employee.query.all():
    # Randomly selects a remuneration type and description
    remuneration_type = random.choice(remuneration_types)
    remuneration_description = random.choice(remuneration_descriptions)

    # Create Remuneration
    remuneration = Remuneration(
        id=generate_uuid(), 
        name=f'Remuneration for {employee.email}',  
        salary=50000.00, 
        employee_id=employee.id, 
        remuneration_date=datetime.utcnow()
    )
    db.session.add(remuneration)

    # Create RemunerationDescription
    description = RemunerationDescription(
        id=generate_uuid(), 
        remuneration_id=remuneration.id, 
        type=remuneration_type, 
        name=f'Description for {remuneration.name}',  
        description=remuneration_description, 
        amount=50000.00  
    )
    db.session.add(description)


# Create Experience
for employee in Employee.query.all():
    experience = Experience(
        id=generate_uuid(), 
        employee_id=employee.id, 
        name=f'Experience for {employee.email}', 
        job_title='Software Engineer', 
        description='Developing cool stuff', 
        start_date=datetime.utcnow(), 
        end_date=datetime.utcnow()
    )
    db.session.add(experience)


# Create session and goals
session = Session(id=generate_uuid(), name='Q1', start_date=datetime.utcnow(), end_date=datetime.utcnow())
db.session.add(session)

# This defines a list of potential goals and descriptions
goal_names = ['Improve coding skills', 'Learn a new language', 'Increase productivity', 'Reduce bugs in code', 'Improve communication skills']
goal_descriptions = ['Attend coding workshops and complete online courses', 'Spend time each week studying a new language', 'Focus on time management and task prioritization', 'Implement more thorough testing procedures', 'Participate in team-building activities and improve report writing skills']

for employee in Employee.query.all():
    # Randomly selects a goal and description
    goal_name = random.choice(goal_names)
    goal_description = random.choice(goal_descriptions)

    goal = Goals(
        id=generate_uuid(), 
        employee_id=employee.id, 
        name=goal_name, 
        description=goal_description, 
        session_id=session.id
    )
    db.session.add(goal)


# Create Training 
trainings = []
for i in range(3):
    training = Training(id=generate_uuid(), title=f'Training{i}', description='Training Description', start_date=datetime.utcnow(), start_time=datetime.utcnow(), end_date=datetime.utcnow() + timedelta(days=1), end_time=datetime.utcnow() + timedelta(days=1))
    db.session.add(training)
    trainings.append(training)

# Create EmployeeTraining 
for employee in Employee.query.all():
    for training in trainings:
        employee_training = EmployeeTraining(id=generate_uuid(), employee_id=employee.id, training_id=training.id)
        db.session.add(employee_training)


# Create Leave 
for employee in Employee.query.all():
    leave = Leave(id=generate_uuid(), employee_id=employee.id, start_date=datetime.utcnow(), end_date=datetime.utcnow() + timedelta(days=1), description='Vacation', approved=False)
    db.session.add(leave)


# Create LeaveApproval 
for leave in Leave.query.all():
    leave_approval = LeaveApproval(id=generate_uuid(), employee_id=leave.employee_id, hr_id=HR_Personel.query.first().id, manager_id=Manager.query.first().id, manager_app_date=datetime.utcnow(), hr_approval_date=datetime.utcnow())
    db.session.add(leave_approval)


# Create Documents 
for employee in Employee.query.all():
    document = Documents(id=generate_uuid(), employee_id=employee.id, link_url='path/to/document', name='Document', type='official')
    db.session.add(document)

# Create Education 
for employee in Employee.query.all():
    education = Education(id=generate_uuid(), employee_id=employee.id, institution='University', course='Computer Science', qualification='Bachelor', start_date=datetime.utcnow(), end_date=datetime.utcnow() + timedelta(days=1))
    db.session.add(education)


try:
    db.session.commit()
    print("Data seeded successfully!")
except Exception as e:
    print("An error occurred while seeding data:", e)