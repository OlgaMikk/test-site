# Generated by Django 4.2.11 on 2024-07-03 04:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0022_alter_estateobject_area_max_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='image',
            options={'ordering': ['order'], 'verbose_name': 'Изображение', 'verbose_name_plural': 'Изображения'},
        ),
        migrations.AddField(
            model_name='image',
            name='order',
            field=models.PositiveIntegerField(default=0, verbose_name='Порядок'),
        ),
    ]
