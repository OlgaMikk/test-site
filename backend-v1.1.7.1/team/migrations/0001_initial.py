# Generated by Django 4.2.11 on 2024-05-03 23:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('ordinary', 'Рядовой сотрудник'), ('supervisor', 'Руководитель')], default='ordinary', max_length=45, verbose_name='Тип')),
                ('full_name', models.CharField(max_length=100, verbose_name='ФИО')),
                ('position', models.CharField(max_length=100, verbose_name='Должность')),
                ('photo', models.ImageField(upload_to='employee_photos/', verbose_name='Фото')),
                ('quote', models.TextField(blank=True, verbose_name='Цитата')),
                ('phone', models.CharField(blank=True, default='', max_length=20, verbose_name='Телефон')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='Email')),
                ('order', models.PositiveIntegerField(default=0, verbose_name='Порядок')),
            ],
            options={
                'verbose_name': 'Сотрудник',
                'verbose_name_plural': 'Сотрудники',
                'ordering': ['order'],
            },
        ),
    ]
