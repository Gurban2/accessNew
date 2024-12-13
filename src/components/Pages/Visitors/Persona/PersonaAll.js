import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../../../modules/Avatar";
import { useFetchVisitors } from "../../../../hooks/useVisitors";
import DataTable from "../../../../modules/DataTable";
import { AppPaths } from "../../../../constants/appPaths";
import Breadcrumb from "../../Breadcrumb";
import { useTranslation } from "react-i18next";
import VisitorBlockButton from "./VisitorBlockButton";
import Search from "../../../../modules/Search";

const PersonaAll = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useFetchVisitors();
  const visitors = data?.data || [];

  const personNonGrataVisitors = visitors.filter(
    (visitor) => visitor.is_blocked,
  );

  const headItems = [
    t("persona.all.photo"),
    t("persona.all.doc_id"),
    t("persona.all.name"),
    t("persona.all.actions"),
  ];

  const items = personNonGrataVisitors.map((visitor) => ({
    id: visitor.id,
    photo: <Avatar size="50px" src={visitor.avatar} alt={visitor.name} />,
    doc_id: visitor.doc_id,
    name: visitor.name,
    actions: <VisitorBlockButton visitor={visitor} isBlocked />,
  }));

  return (
    <div className="user-container">
      <Search
        path={AppPaths.persona.all}
        placeholder={t("visitors.all.searchPlaceholder")}
      />
      <Breadcrumb
        paths={[
          { label: t("breadcrumbs.dashboard"), to: AppPaths.dashboard },
          { label: t("breadcrumbs.personaAll") },
        ]}
      />
      <div className="head-wrapper justify-content-end">
        <Button type="button" variant="success">
          <Link to={AppPaths.persona.add}>{t("persona.all.add")}</Link>
        </Button>
      </div>
      <hr className="navigation-underline" />

      <DataTable headItems={headItems} items={items} isLoading={isLoading} />
    </div>
  );
};

export default PersonaAll;
