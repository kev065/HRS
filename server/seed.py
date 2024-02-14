from app import create_app
from models import db, Employee, Manager, HR_Personel, EmployeeProfile, ManagerProfile, HrProfile, Remuneration, RemunerationDescription, Experience, Session, Goals, Training, EmployeeTraining, Leave, LeaveApproval, Documents, Education, Department
import uuid

app = create_app()
app.app_context().push()

def generate_uuid():
    return str(uuid.uuid4())

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

db.session.commit()
