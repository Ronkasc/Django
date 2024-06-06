from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='products/')
    price = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    brand = models.CharField(max_length=100)

    def __str__(self):
        return self.name


