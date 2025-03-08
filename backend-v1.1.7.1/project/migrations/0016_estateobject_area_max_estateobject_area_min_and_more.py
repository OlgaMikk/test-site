# Generated by Django 4.2.11 on 2024-04-18 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0015_location_project_catalog_btn_link_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='estateobject',
            name='area_max',
            field=models.PositiveIntegerField(default=0, verbose_name='Максимальная площадь'),
        ),
        migrations.AddField(
            model_name='estateobject',
            name='area_min',
            field=models.PositiveIntegerField(default=0, verbose_name='Минимальная площадь'),
        ),
        migrations.AddField(
            model_name='estateobject',
            name='floor_count',
            field=models.PositiveIntegerField(default=0, verbose_name='Этажность'),
        ),
        migrations.AddField(
            model_name='estateobject',
            name='room_count',
            field=models.PositiveIntegerField(default=0, verbose_name='Количество комнат'),
        ),
    ]
