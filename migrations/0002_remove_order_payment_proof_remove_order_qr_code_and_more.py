# Generated by Django 5.2.1 on 2025-06-03 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='payment_proof',
        ),
        migrations.RemoveField(
            model_name='order',
            name='qr_code',
        ),
        migrations.RemoveField(
            model_name='order',
            name='total_amount',
        ),
        migrations.AddField(
            model_name='order',
            name='comprobante',
            field=models.ImageField(blank=True, null=True, upload_to='comprobantes/'),
        ),
        migrations.AddField(
            model_name='order',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
