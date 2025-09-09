from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from events.views import EventViewSet
from core.auth_views import RegisterView
from core.views import (
    ProjectViewSet, TaskViewSet, ReportViewSet, MeetingViewSet,
    NoteViewSet, CalendarEventViewSet, QuoteViewSet, dashboard_summary,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Register API routes
router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="projects")
router.register(r"tasks", TaskViewSet, basename="tasks")
router.register(r"reports", ReportViewSet, basename="reports")
router.register(r"meetings", MeetingViewSet, basename="meetings")
router.register(r"notes", NoteViewSet, basename="notes")
router.register(r"calendar-events", CalendarEventViewSet, basename="calendar-events")
router.register(r"quotes", QuoteViewSet, basename="quotes")
router.register(r"events", EventViewSet, basename="events")

urlpatterns = [
    path("admin/", admin.site.urls),

    # Main API routes
    path("api/", include(router.urls)),

    # Auth routes
    path("api/auth/register/", RegisterView.as_view(), name="auth_register"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include("core.urls")),

    # If you still need dashboard summary
    path("api/dashboard-summary/", dashboard_summary, name="dashboard_summary"),
]
