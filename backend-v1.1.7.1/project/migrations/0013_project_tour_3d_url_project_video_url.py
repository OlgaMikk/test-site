# Generated by Django 4.2.11 on 2024-04-18 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0012_alter_layout_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='tour_3d_url',
            field=models.URLField(blank=True, null=True, verbose_name='3D тур'),
        ),
        migrations.AddField(
            model_name='project',
            name='video_url',
            field=models.URLField(blank=True, null=True, verbose_name='Ссылка на видео'),
        ),
    ]
