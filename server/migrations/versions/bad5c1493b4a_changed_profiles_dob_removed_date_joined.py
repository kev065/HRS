"""Changed profiles dob, removed date joined

Revision ID: bad5c1493b4a
Revises: a79dbbe0bbb8
Create Date: 2024-02-22 16:37:25.261963

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bad5c1493b4a'
down_revision = 'a79dbbe0bbb8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employee_profiles', schema=None) as batch_op:
        batch_op.alter_column('date_of_birth',
               existing_type=sa.DATETIME(),
               type_=sa.Date(),
               existing_nullable=False)
        batch_op.drop_column('date_joined')

    with op.batch_alter_table('hr_profiles', schema=None) as batch_op:
        batch_op.alter_column('date_of_birth',
               existing_type=sa.DATETIME(),
               type_=sa.Date(),
               existing_nullable=False)
        batch_op.drop_column('date_joined')

    with op.batch_alter_table('manager_profiles', schema=None) as batch_op:
        batch_op.alter_column('date_of_birth',
               existing_type=sa.DATETIME(),
               type_=sa.Date(),
               existing_nullable=False)
        batch_op.drop_column('date_joined')

    with op.batch_alter_table('tokenblocklist', schema=None) as batch_op:
        batch_op.drop_index('ix_tokenblocklist_jti')
        batch_op.create_index(batch_op.f('ix_tokenblocklist_jti'), ['jti'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tokenblocklist', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_tokenblocklist_jti'))
        batch_op.create_index('ix_tokenblocklist_jti', ['jti'], unique=False)

    with op.batch_alter_table('manager_profiles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_joined', sa.DATETIME(), nullable=False))
        batch_op.alter_column('date_of_birth',
               existing_type=sa.Date(),
               type_=sa.DATETIME(),
               existing_nullable=False)

    with op.batch_alter_table('hr_profiles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_joined', sa.DATETIME(), nullable=False))
        batch_op.alter_column('date_of_birth',
               existing_type=sa.Date(),
               type_=sa.DATETIME(),
               existing_nullable=False)

    with op.batch_alter_table('employee_profiles', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_joined', sa.DATETIME(), nullable=False))
        batch_op.alter_column('date_of_birth',
               existing_type=sa.Date(),
               type_=sa.DATETIME(),
               existing_nullable=False)

    # ### end Alembic commands ###