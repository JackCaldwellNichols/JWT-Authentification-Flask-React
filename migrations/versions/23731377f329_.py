"""empty message

Revision ID: 23731377f329
Revises: 5a379edc8ee4
Create Date: 2022-11-28 09:35:57.545546

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '23731377f329'
down_revision = '5a379edc8ee4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))

    # ### end Alembic commands ###
