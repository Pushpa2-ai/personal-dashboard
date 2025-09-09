from django.db import models

class Event(models.Model):
    CATEGORY_CHOICES = [
        ("personal", "Personal"),
        ("work", "Work"),
        ("calendar", "Calendar"),
        ("task_today", "Task Today"),
        ("task_weekly", "Task Weekly"),
        ("notes", "Notes"),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    date = models.DateField(blank=True, null=True)   # for calendar events
    completed = models.BooleanField(default=False)   # for tasks

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.category})"
