from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url

from rest_framework import permissions

from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="ya-pack API",
      default_version='v1',
      description="Документация для приложения ya-pack",
      contact=openapi.Contact(email="admin@admin.ru"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('api/', include('api.urls')),
    path('ds_exchange/', include('ds_exchange.urls')),
    url(
      r'^redoc/$',
      schema_view.with_ui('redoc', cache_timeout=0),
      name='schema-redoc'),
]
