import datetime

from django.utils.dates import MONTHS


def year_choices():
    return [(r, r) for r in range(1984, datetime.date.today().year + 4)]


def current_year():
    return datetime.date.today().year


def month_choices():
    return MONTHS.items()


def current_month():
    return datetime.date.today().month
