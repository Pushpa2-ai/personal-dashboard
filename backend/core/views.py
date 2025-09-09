from datetime import date, timedelta
from django.db.models import Count, Q
from rest_framework import viewsets, permissions, decorators
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Project, Task, Report, Meeting, Note, CalendarEvent, Quote
from .serializers import (
    ProjectSerializer, TaskSerializer, ReportSerializer, MeetingSerializer,
    NoteSerializer, CalendarEventSerializer, QuoteSerializer
)

class UserOwnedViewSet(viewsets.ModelViewSet):
    """Base class to make all objects user-specific"""
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)

class ProjectViewSet(UserOwnedViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TaskViewSet(UserOwnedViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class NoteViewSet(UserOwnedViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class CalendarEventViewSet(UserOwnedViewSet):
    queryset = CalendarEvent.objects.all()
    serializer_class = CalendarEventSerializer

class ReportViewSet(UserOwnedViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class MeetingViewSet(UserOwnedViewSet):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer

class QuoteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer

    @decorators.action(detail=False, methods=["get"])
    def random(self, request):
        qs = self.get_queryset().order_by("?")
        item = qs.first()
        if not item:
            return Response({"text": "Stay curious, keep building.", "author": "—"}, status=200)
        return Response(QuoteSerializer(item).data)

# Dashboard summary for Work/Personal cards
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_summary(request):
    """
    Returns a summary of all models for the dashboard
    """
    notes_count = Note.objects.filter(user=request.user).count()
    projects_count = Project.objects.filter(user=request.user).count()
    tasks_count = Task.objects.filter(user=request.user).count()
    events_count = CalendarEvent.objects.filter(user=request.user).count()
    reports_count = Report.objects.filter(user=request.user).count()
    meetings_count = Meeting.objects.filter(user=request.user).count()
    quotes_count = Quote.objects.filter(user=request.user).count()

    return Response({
        "notes": notes_count,
        "projects": projects_count,
        "tasks": tasks_count,
        "events": events_count,
        "reports": reports_count,
        "meetings": meetings_count,
        "quotes": quotes_count,
    })
