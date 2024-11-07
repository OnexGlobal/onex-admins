import { notification } from "antd";

export const notificationSuccess = (
  title = "Notification Title",
  description = "Notification description"
) => {
  notification.success({
    message: title,
    description: description,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};
export const notificationError = (
  title = "Notification Title",
  description = "Notification description"
) => {
  notification.error({
    message: title,
    description: description,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};
