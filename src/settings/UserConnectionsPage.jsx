import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinkField from '../common/components/LinkField';
import { useTranslation } from '../common/components/LocalizationProvider';
import SettingsMenu from './components/SettingsMenu';
import { formatNotificationTitle } from '../common/util/formatter';
import PageLayout from '../common/components/PageLayout';
import useSettingsStyles from './common/useSettingsStyles';

const UserConnectionsPage = () => {
  const classes = useSettingsStyles();
  const t = useTranslation();

  const { id } = useParams();

  return (
    <PageLayout
      menu={<SettingsMenu />}
      breadcrumbs={["settingsTitle", "settingsUser", "sharedConnections"]}
    >
      <Container maxWidth="xs" className={classes.container}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">
              {t("sharedConnections")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/devices?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/devices?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="deviceId"
              titleGetter={(it) => `${it.name} (${it.uniqueId})`}
              label={t("deviceTitle")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/groups?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/groups?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="groupId"
              label={t("settingsGroups")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/geofences?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/geofences?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="geofenceId"
              label={t("sharedGeofences")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/notifications?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/notifications?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="notificationId"
              titleGetter={(it) => formatNotificationTitle(t, it, true)}
              label={t("sharedNotifications")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/calendars?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/calendars?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="calendarId"
              label={t("sharedCalendars")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/users?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/users?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="managedUserId"
              label={t("settingsUsers")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/attributes/computed?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/attributes/computed?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="attributeId"
              titleGetter={(it) => it.description}
              label={t("sharedComputedAttributes")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/drivers?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/drivers?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="driverId"
              titleGetter={(it) => `${it.name} (${it.uniqueId})`}
              label={t("sharedDrivers")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/commands?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/commands?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="commandId"
              titleGetter={(it) => it.description}
              label={t("sharedSavedCommands")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/maintenance?all=true"
              endpointLinked={`http://108.181.186.122:8082/api/maintenance?userId=${id}`}
              baseId={id}
              keyBase="userId"
              keyLink="maintenanceId"
              label={t("sharedMaintenance")}
            />
          </AccordionDetails>
        </Accordion>
      </Container>
    </PageLayout>
  );
};

export default UserConnectionsPage;
