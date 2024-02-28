from datetime import datetime, date
from app import create_app
from models import (Employee, Manager, Department, HR_Personel, EmployeeProfile, ManagerProfile, HrProfile,
                    Remuneration, RemunerationDescription, Experience, Session, Goals, Training, EmployeeTraining,
                    Leave, LeaveApproval, Documents, Education, TokenBlocklist, db)

app = create_app()


def seed_database():
    with app.app_context():
        Employee.query.delete()
        Manager.query.delete()
        Department.query.delete()
        HR_Personel.query.delete()
        EmployeeProfile.query.delete()
        ManagerProfile.query.delete()
        HrProfile.query.delete()
        Remuneration.query.delete()
        RemunerationDescription.query.delete()
        Experience.query.delete()
        Session.query.delete()
        Training.query.delete()
        EmployeeTraining.query.delete()
        Leave.query.delete()
        LeaveApproval.query.delete()
        Education.query.delete()
        db.create_all()

        # Departments
        department_data = [
            {"name": "Engineering"},
            {"name": "Human Resources"},
            {"name": "Finance"}
        ]
        departments = []
        for dept_info in department_data:
            department = Department(**dept_info)
            departments.append(department)
            db.session.add(department)
        db.session.commit()

        # Managers
        manager_data = [
            {"email": "manager1@example.com", "password": "hashed_password_1",
                "dept_id": departments[0].id,"personal_no":"SF1120"},
            {"email": "manager2@example.com", "password": "hashed_password_2",
                "dept_id": departments[1].id,"personal_no":"SF1130"},
        ]
        managers = []
        for manager_info in manager_data:
            manager = Manager(**manager_info)
            managers.append(manager)
            db.session.add(manager)
        db.session.commit()

        # Employees
        employee_data = [
            {"email": "employee1@example.com",
                "password": "hashed_password_1", "dept_id": departments[0].id,"personal_no":"SF1100"},
            {"email": "employee2@example.com",
                "password": "hashed_password_2", "dept_id": departments[1].id,"personal_no":"SF1110"},
        ]
        employees = []
        for employee_info in employee_data:
            employee = Employee(**employee_info)
            employees.append(employee)
            db.session.add(employee)
        db.session.commit()

        # Employee Profiles
        employee_profile_data = [
            {"date_of_birth": date(1990, 5, 15), "employee_id": employees[0].id, "first_name": "John", "last_name": "Doe",
             "mantra": "Work hard, play hard", "phone_contact": 1234567890, "profile_photo": "profile1.jpg",
             "title": "Software Engineer"},
            {"date_of_birth": date(1992, 8, 21), "employee_id": employees[1].id, "first_name": "Jane", "last_name": "Smith",
             "mantra": "Continuous learning is the key", "phone_contact": 9876543210, "profile_photo": "profile2.jpg",
             "title": "HR Coordinator"}
        ]
        for profile_info in employee_profile_data:
            profile = EmployeeProfile(**profile_info)
            db.session.add(profile)
        db.session.commit()

        # Manager Profiles
        manager_profile_data = [
            {"date_of_birth": date(1985, 10, 8), "manager_id": managers[0].id, "first_name": "Michael", "last_name": "Johnson",
             "mantra": "Lead by example", "phone_contact": 5551234567, "profile_photo": "profile3.jpg",
             "title": "Engineering Manager"},
            {"date_of_birth": date(1978, 3, 17), "manager_id": managers[1].id, "first_name": "Emily", "last_name": "Brown",
             "mantra": "Empower your team", "phone_contact": 5559876543, "profile_photo": "profile4.jpg",
             "title": "HR Manager"}
        ]
        for profile_info in manager_profile_data:
            profile = ManagerProfile(**profile_info)
            db.session.add(profile)
        db.session.commit()

        # HR Profiles
        hr_profile_data = [
            {"date_of_birth": date(1989, 7, 23), "hr_id": managers[0].id, "first_name": "Sarah", "last_name": "Williams",
             "mantra": "Dedicated to employee well-being", "phone_contact": 5552468101, "profile_photo": "profile5.jpg",
             "title": "HR Specialist"}
        ]
        for profile_info in hr_profile_data:
            profile = HrProfile(**profile_info)
            db.session.add(profile)
        db.session.commit()

        # Remunerations
        remuneration_data = [
            {"name": "Monthly Salary", "salary": 5000.0,
                "employee_id": employees[0].id},
            {"name": "Monthly Salary", "salary": 6000.0,
                "employee_id": employees[1].id},
        ]
        for remuneration_info in remuneration_data:
            remuneration = Remuneration(**remuneration_info)
            db.session.add(remuneration)
        db.session.commit()

        # Remuneration Descriptions
        remuneration_desc_data = [
            {"remuneration_id": 1, "type": "deduction", "name": "Insurance",
                "description": "Health insurance deduction", "amount": 200.0},
            {"remuneration_id": 1, "type": "allowance", "name": "Transport",
                "description": "Transport allowance", "amount": 300.0},
            {"remuneration_id": 2, "type": "deduction", "name": "Insurance",
                "description": "Health insurance deduction", "amount": 150.0},
            {"remuneration_id": 2, "type": "allowance", "name": "Transport",
                "description": "Transport allowance", "amount": 350.0},
        ]
        for desc_info in remuneration_desc_data:
            desc = RemunerationDescription(**desc_info)
            db.session.add(desc)
        db.session.commit()

        # Experiences
        experience_data = [
            {"employee_id": employees[0].id, "name": "ABC Company", "job_title": "Software Developer",
             "description": "Developed web applications using Python and Django", "start_date": datetime(2010, 5, 1),
             "end_date": datetime(2015, 2, 28)},
            {"employee_id": employees[1].id, "name": "XYZ Corporation", "job_title": "HR Assistant",
             "description": "Assisted in recruitment and onboarding processes", "start_date": datetime(2016, 8, 15),
             "end_date": datetime(2019, 12, 31)}
        ]
        for exp_info in experience_data:
            experience = Experience(**exp_info)
            db.session.add(experience)
        db.session.commit()

        # Goals
        goal_data = [
            {"employee_id": employees[0].id, "name": "Complete Python Certification", "description": "Earn certification in Python programming",
             "session_id": 1},
            {"employee_id": employees[1].id, "name": "Improve Recruitment Process", "description": "Optimize recruitment workflow",
             "session_id": 2}
        ]
        for goal_info in goal_data:
            goal = Goals(**goal_info)
            db.session.add(goal)
        db.session.commit()

        # Trainings
        training_data = [
            {"title": "Python Fundamentals", "description": "Basic concepts and syntax of Python programming",
             "start_date": datetime(2024, 3, 1), "start_time": datetime.strptime("09:00", "%H:%M").time(),
             "end_date": datetime(2024, 3, 5), "end_time": datetime.strptime("17:00", "%H:%M").time()},
            {"title": "Recruitment Strategies", "description": "Effective techniques for talent acquisition",
             "start_date": datetime(2024, 3, 10), "start_time": datetime.strptime("10:00", "%H:%M").time(),
             "end_date": datetime(2024, 3, 12), "end_time": datetime.strptime("16:00", "%H:%M").time()}
        ]
        for training_info in training_data:
            training = Training(**training_info)
            db.session.add(training)
        db.session.commit()

        # Employee Trainings
        employee_training_data = [
            {"employee_id": employees[0].id, "training_id": 1},
            {"employee_id": employees[1].id, "training_id": 2}
        ]
        for et_info in employee_training_data:
            et = EmployeeTraining(**et_info)
            db.session.add(et)
        db.session.commit()

        # Leaves
        leave_data = [
            {"start_date": datetime(2024, 2, 1), "end_date": datetime(2024, 2, 5), "employee_id": employees[0].id,
             "description": "Vacation leave"},
            {"start_date": datetime(2024, 2, 10), "end_date": datetime(2024, 2, 15), "employee_id": employees[1].id,
             "description": "Sick leave"}
        ]
        for leave_info in leave_data:
            leave = Leave(**leave_info)
            db.session.add(leave)
        db.session.commit()

        # Leave Approvals
        leave_approval_data = [
            {"leave_id": 1, "employee_id": employees[0].id, "manager_id": managers[0].id, "approved_by_manager": True,
             "manager_app_date": datetime(2024, 1, 30)},
            {"leave_id": 2, "employee_id": employees[1].id, "hr_id": managers[0].id, "approved_by_hr": True,
             "hr_approval_date": datetime(2024, 2, 8)}
        ]
        for approval_info in leave_approval_data:
            approval = LeaveApproval(**approval_info)
            db.session.add(approval)
        db.session.commit()

        # Education
        education_data = [
            {"employee_id": employees[0].id, "institution": "University ABC", "course": "Computer Science",
             "qualification": "Bachelor's Degree", "start_date": datetime(2010, 9, 1), "end_date": datetime(2014, 6, 30)},
            {"employee_id": employees[1].id, "institution": "College XYZ", "course": "Human Resource Management",
             "qualification": "Master's Degree", "start_date": datetime(2015, 9, 1), "end_date": datetime(2017, 6, 30)}
        ]
        for edu_info in education_data:
            edu = Education(**edu_info)
            db.session.add(edu)
        db.session.commit()

        # Token Blocklist (Sample Data - Manually added)
        token_blocklist_data = [
            {"jti": "sample_jti_1", "created_at": datetime.utcnow()},
            {"jti": "sample_jti_2", "created_at": datetime.utcnow()}
        ]
        for token_info in token_blocklist_data:
            token = TokenBlocklist(**token_info)
            db.session.add(token)
        db.session.commit()
        document_data = [
            {"employee_id": "employee_id_1", "link_url": "https://example.com/document1",
                "name": "Document 1", "type": "official"},
            {"employee_id": "employee_id_2", "link_url": "https://example.com/document2",
                "name": "Document 2", "type": "institution"},
            {"employee_id": "employee_id_3", "link_url": "https://example.com/document3",
                "name": "Document 3", "type": "other"},
        ]
        for doc_info in document_data:
            document = Documents(**doc_info)
            db.session.add(document)
        db.session.commit()

        # Seed data for HR Personnels
        hr_personnel_data = [
            {"email": "hr1@example.com", "password": "hashed_password_1",
                "dept_id": "department_id_1","personal_no":"SF1160"},
            {"email": "hr2@example.com", "password": "hashed_password_2",
                "dept_id": "department_id_2","personal_no":"SF1150"},
        ]
        for hr_info in hr_personnel_data:
            hr_personnel = HR_Personel(**hr_info)
            db.session.add(hr_personnel)
        db.session.commit()

        # Seed data for Sessions
        session_data = [
            {"name": "Session 1", "start_date": datetime(
                2024, 1, 1), "end_date": datetime(2024, 1, 30)},
            {"name": "Session 2", "start_date": datetime(
                2024, 2, 1), "end_date": datetime(2024, 2, 29)},
        ]
        for session_info in session_data:
            session = Session(**session_info)
            db.session.add(session)
        db.session.commit()


if __name__ == "__main__":
    seed_database()
