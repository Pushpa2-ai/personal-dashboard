from rest_framework import serializers
from .models import Project, Task, Report, Meeting, Note, CalendarEvent, Quote


class BaseUserOwnedSerializer(serializers.ModelSerializer):
    """Base serializer for models that belong to a user.
    Always excludes the user field (auto-assigned in the viewset).
    """

    class Meta:
        abstract = False  # not needed actually, just remove "abstract" entirely
        # We won’t declare fields or exclude here, children will handle it


class ProjectSerializer(BaseUserOwnedSerializer):
    class Meta:
        model = Project
        exclude = ("user",)  # ✅ exclude user only


class TaskSerializer(BaseUserOwnedSerializer):
    class Meta:
        model = Task
        exclude = ("user",)


class NoteSerializer(BaseUserOwnedSerializer):
    class Meta:
        model = Note
        exclude = ("user",)


class CalendarEventSerializer(BaseUserOwnedSerializer):
    class Meta:
        model = CalendarEvent
        exclude = ("user",)


class ReportSerializer(BaseUserOwnedSerializer):
    class Meta:
        model = Report
        exclude = ("user",)


class MeetingSerializer(BaseUserOwnedSerializer):
    class Meta:
        model = Meeting
        exclude = ("user",)


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = "__all__"
