import { AppPaths } from "./appPaths";

const sections = [
  {
    title: "Offices and Departments",
    departments: [
      {
        title: "Offices",
        items: [
          { label: "All", path: AppPaths.offices.all },
          { label: "Add", path: AppPaths.offices.add },
        ],
      },
      {
        title: "Departments",
        items: [
          { label: "All", path: AppPaths.departments.all },
          { label: "Add", path: AppPaths.departments.add },
        ],
      },
    ],
  },
  {
    title: "Visitors",
    departments: [
      {
        title: "Visitors",
        items: [
          { label: "All", path: AppPaths.visitors.all },
          { label: "Add", path: AppPaths.visitors.add },
        ],
      },
      {
        title: "Person Non Grata",
        items: [
          { label: "All", path: AppPaths.visitors.persona.all },
          { label: "Add", path: AppPaths.visitors.persona.add },
        ],
      },
    ],
  },
  {
    title: "Site",
    departments: [
      {
        title: "Settings",
        items: [{ label: "Site Settings", path: AppPaths.site.settings }],
      },
      {
        title: "Translations",
        items: [{ label: "Translations", path: AppPaths.site.translations }],
      },
    ],
  },
  {
    title: "Users & Permissions",
    departments: [
      {
        title: "Users",
        items: [
          { label: "List", path: AppPaths.users.permissions.list },
          { label: "Add User", path: AppPaths.users.permissions.addUser },
        ],
      },
      {
        title: "Permissions",
        items: [
          { label: "All", path: AppPaths.users.permissions.all },
          { label: "Add Permission", path: AppPaths.users.permissions.add },
        ],
      },
    ],
  },
];

export default sections;

