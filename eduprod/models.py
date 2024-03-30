from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class Question(models.Model):
    question_text = models.TextField(max_length=1000)
    answertextA = models.CharField(max_length = 50, default="", blank=True)  #Optional. Required for multiple choice only
    answertextB = models.CharField(max_length = 50, default="", blank=True)  #Optional
    answertextC = models.CharField(max_length = 50, default="", blank=True)  #Optional
    answertextD = models.CharField(max_length = 50, default="", blank=True)  #Optional
    correctanswer = models.CharField(max_length = 50, default="" ) #Mandatory. Answer required for all questions
    hasmultiplechoice = models.BooleanField(default=True) #True if multiple choice question. False for single answer
    question_image = models.ImageField(default="", blank=True, upload_to="eduprod/static") 

    def __str__(self):
        return self.question_text

    