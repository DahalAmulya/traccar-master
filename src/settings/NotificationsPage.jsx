import React, { useState } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Box,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffectAsync } from "../reactHelper";
import { prefixString } from "../common/util/stringUtils";
import { formatBoolean } from "../common/util/formatter";
import { useTranslation } from "../common/components/LocalizationProvider";
import PageLayout from "../common/components/PageLayout";
import SettingsMenu from "./components/SettingsMenu";
import CollectionFab from "./components/CollectionFab";
import CollectionActions from "./components/CollectionActions";
import TableShimmer from "../common/components/TableShimmer";
import SearchHeader, { filterByKeyword } from "./components/SearchHeader";

const useStyles = makeStyles((theme) => ({
  table: {
    // Your existing styles
  },
  columnAction: {
    // Your existing styles
  },
  notificationBox: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  boxHeading: {
    marginBottom: theme.spacing(1),
  },
  subBox: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: theme.spacing(2),
  },
  high: {
    color: theme.palette.error.main,
  },
  medium: {
    color: theme.palette.warning.main,
  },
  low: {
    color: theme.palette.success.main,
  },
}));

const NotificationsPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/notifications");
      if (response.ok) {
        setItems(await response.json());
      } else {
        throw Error(await response.text());
      }
    } finally {
      setLoading(false);
    }
  }, [timestamp]);

  const formatList = (prefix, value) => {
    if (value) {
      return value
        .split(/[, ]+/)
        .filter(Boolean)
        .map((it) => t(prefixString(prefix, it)))
        .join(", ");
    }
    return "";
  };

  return (
    <PageLayout
      menu={<SettingsMenu />}
      breadcrumbs={["settingsTitle", "sharedNotifications"]}
    >
      <Box className={classes.notificationBox}>
        <Typography variant="h5" className={classes.boxHeading}>
          {t("notification")}
        </Typography>
        <Box className={classes.subBox}>
          <Typography variant="h6" className={classes.high}>
            {t("high")}
          </Typography>
          <Typography variant="h6" className={classes.medium}>
            {t("medium")}
          </Typography>
          <Typography variant="h6" className={classes.low}>
            {t("low")}
          </Typography>
        </Box>
        <Typography variant="h5" className={classes.boxHeading}>
          {t("announcement")}
        </Typography>
      </Box>
      <SearchHeader keyword={searchKeyword} setKeyword={setSearchKeyword} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{t("notificationType")}</TableCell>
            <TableCell>{t("notificationAlways")}</TableCell>
            <TableCell>{t("sharedAlarms")}</TableCell>
            <TableCell>{t("notificationNotificators")}</TableCell>
            <TableCell className={classes.columnAction} />
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            items.filter(filterByKeyword(searchKeyword)).map((item) => (
              <TableRow key={item.id}>
                <TableCell>{t(prefixString("event", item.type))}</TableCell>
                <TableCell>{formatBoolean(item.always, t)}</TableCell>
                <TableCell>
                  {formatList("alarm", item.attributes.alarms)}
                </TableCell>
                <TableCell>
                  {formatList("notificator", item.notificators)}
                </TableCell>
                <TableCell className={classes.columnAction} padding="none">
                  <CollectionActions
                    itemId={item.id}
                    editPath="/settings/notification"
                    endpoint="notifications"
                    setTimestamp={setTimestamp}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableShimmer columns={5} endAction />
          )}
        </TableBody>
      </Table>
      <CollectionFab editPath="/settings/notification" />
    </PageLayout>
  );
};

export default NotificationsPage;
