# Generated by Django 3.2 on 2022-09-24 04:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('diaries', '0007_auto_20220924_1326'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diaryimage',
            name='diary',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diaries.diary'),
        ),
        migrations.AlterField(
            model_name='diarymusic',
            name='diary',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diaries.diary'),
        ),
        migrations.AlterField(
            model_name='diarysticker',
            name='diary',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diaries.diary'),
        ),
    ]