# Generated by Django 4.2.11 on 2024-05-22 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='slug',
            field=models.SlugField(blank=True, max_length=125, null=True, unique=True, verbose_name='Slug'),
        ),
    ]
