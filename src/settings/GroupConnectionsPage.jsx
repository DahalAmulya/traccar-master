import React from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinkField from "../common/components/LinkField";
import { useTranslation } from "../common/components/LocalizationProvider";
import SettingsMenu from "./components/SettingsMenu";
import { formatNotificationTitle } from "../common/util/formatter";
import PageLayout from "../common/components/PageLayout";
import useFeatures from "../common/util/useFeatures";
import useSettingsStyles from "./common/useSettingsStyles";

const GroupConnectionsPage = () => {
  const classes = useSettingsStyles();
  const t = useTranslation();

  const { id } = useParams();

  const features = useFeatures();

  return (
    <PageLayout
      menu={<SettingsMenu />}
      breadcrumbs={["settingsTitle", "groupDialog", "sharedConnections"]}
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
              endpointAll="http://108.181.186.122:8082/api/geofences"
              endpointLinked={`http://108.181.186.122:8082/api/geofences?groupId=${id}`}
              baseId={id}
              keyBase="groupId"
              keyLink="geofenceId"
              label={t("sharedGeofences")}
            />
            <LinkField
              endpointAll="http://108.181.186.122:8082/api/notifications"
              endpointLinked={`http://108.181.186.122:8082/api/notifications?groupId=${id}`}
              baseId={id}
              keyBase="groupId"
              keyLink="notificationId"
              titleGetter={(it) => formatNotificationTitle(t, it)}
              label={t("sharedNotifications")}
            />
            {!features.disableDrivers && (
              <LinkField
                endpointAll="http://108.181.186.122:8082/api/drivers"
                endpointLinked={`http://108.181.186.122:8082/api/drivers?groupId=${id}`}
                baseId={id}
                keyBase="groupId"
                keyLink="driverId"
                titleGetter={(it) => `${it.name} (${it.uniqueId})`}
                label={t("sharedDrivers")}
              />
            )}
            {!features.disableComputedAttributes && (
              <LinkField
                endpointAll="http://108.181.186.122:8082/api/attributes/computed"
                endpointLinked={`http://108.181.186.122:8082/api/attributes/computed?groupId=${id}`}
                baseId={id}
                keyBase="groupId"
                keyLink="attributeId"
                titleGetter={(it) => it.description}
                label={t("sharedComputedAttributes")}
              />
            )}
            {!features.disableSavedCommands && (
              <LinkField
                endpointAll="http://108.181.186.122:8082/api/commands"
                endpointLinked={`http://108.181.186.122:8082/api/commands?groupId=${id}`}
                baseId={id}
                keyBase="groupId"
                keyLink="commandId"
                titleGetter={(it) => it.description}
                label={t("sharedSavedCommands")}
              />
            )}
            {!features.disableMaintenance && (
              <LinkField
                endpointAll="http://108.181.186.122:8082/api/maintenance"
                endpointLinked={`http://108.181.186.122:8082/api/maintenance?groupId=${id}`}
                baseId={id}
                keyBase="groupId"
                keyLink="maintenanceId"
                label={t("sharedMaintenance")}
              />
            )}
          </AccordionDetails>
        </Accordion>
      </Container>
    </PageLayout>
  );
};

export default GroupConnectionsPage;
