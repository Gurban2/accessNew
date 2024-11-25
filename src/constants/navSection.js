import { AppPaths } from "./appPaths";
import "boxicons";

const sections = [
  {
    title: "Offices and Departments",
    icon: "building", // Added icon for this section
    departments: [
      {
        title: "Offices",
        icon: "building", // Added icon for Offices
        items: [
          { label: "All", path: AppPaths.offices.all },
          { label: "Add", path: AppPaths.offices.add },
        ],
      },
      {
        title: "Departments",
        icon: "bx bxs-institution", // Added icon for Departments
        items: [
          { label: "All", path: AppPaths.departments.all },
          { label: "Add", path: AppPaths.departments.add },
        ],
      },
    ],
  },
  {
    title: "Visitors",
    icon: "bx bxs-user-detail", // Added icon for Visitors section
    departments: [
      {
        title: "Visitors",
        icon: "bx bx-user", // Added icon for Visitors item
        items: [
          { label: "All", path: AppPaths.visitors.all },
          { label: "Add", path: AppPaths.visitors.add },
        ],
      },
      {
        title: "Person Non Grata",
        icon: "bx bx-user-x", // Added icon for Person Non Grata
        items: [
          { label: "All", path: AppPaths.visitors.persona.all },
          { label: "Add", path: AppPaths.visitors.persona.add },
        ],
      },
    ],
  },
  {
    title: "Site",
    icon: "bx bx-globe", // Added icon for Site section
    departments: [
      {
        title: "Settings",
        icon: "bx bx-list-ul", // Added icon for Settings
        items: [{ label: "Site Settings", path: AppPaths.site.settings }],
      },
      {
        title: "Translations",
        icon: "bx bx-globe", // Added icon for Translations
        items: [{ label: "Translations", path: AppPaths.site.translations }],
      },
    ],
  },
  {
    title: "Users & Permissions",
    icon: "bx bx-user-check", // Added icon for Users & Permissions section
    departments: [
      {
        title: "Users",
        icon: "bx bx-user", // Added icon for Users item
        items: [
          { label: "List", path: AppPaths.users.permissions.list },
          { label: "Add User", path: AppPaths.users.permissions.addUser },
        ],
      },
      {
        title: "Permissions",
        icon: "bx bx-lock", // Added icon for Permissions item
        items: [
          { label: "All", path: AppPaths.users.permissions.all },
          { label: "Add Permission", path: AppPaths.users.permissions.add },
        ],
      },
    ],
  },
];

export default sections;
