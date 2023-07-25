import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "userProfile",
  state: () => ({
    basic: {
      username: "Shawn Qiu",
      realname: "Qiu Shihao",
      email: "qiushihao@outlook.com",
      avatar:
        "https://ui-avatars.com/api/?background=ffffff&format=svg&name=Shawn+Qiu",
      location: "China,Shanghai",
      role: "Admin",
      disabled: false,
      about: "Full Stack Developer",
      lastSignIn: "2023-03-29T01:11:13Z",
    },
    authorized: {
      google: false,
      facebook: false,
    },
    notifications: {
      officialEmails: true,
      followerUpdates: true,
    },
  }),
  actions: {
    getProfile() {
      return {
        basic: this.basic,
        authorized: this.authorized,
        notifications: this.notifications,
      };
    },

    // update Basic Info
    updateBasicInfo(info) {
      this.basic = { ...this.basic, ...info };
    },
    // update Authorized
    updateAuthorizedStatus(service, status) {
      this.authorized[service] = status;
    },
    // Update Notifications
    updateNotificationSettings(settings) {
      this.notifications = { ...this.notifications, ...settings };
    },
  },
});
