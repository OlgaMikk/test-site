# Generated by Django 4.2.7 on 2024-01-25 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0011_room_blocked_at_room_is_sold'),
    ]

    operations = [
        migrations.AlterField(
            model_name='layout',
            name='room',
            field=models.IntegerField(default=0, help_text='"Студия" - это поле со значением 0', verbose_name='Количество комнат'),
        ),
    ]
