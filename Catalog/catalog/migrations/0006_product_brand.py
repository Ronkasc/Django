# Generated by Django 5.0.6 on 2024-05-24 13:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("catalog", "0005_category_brand"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="brand",
            field=models.CharField(default="Unknown", max_length=100),
            preserve_default=False,
        ),
    ]
