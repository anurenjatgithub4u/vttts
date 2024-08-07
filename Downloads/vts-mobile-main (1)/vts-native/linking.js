const config = {
  screens: {
    // RootScreen
    SplashScreen: "SplashScreen",
    LoadingScreen: "LoadingScreen",
    LoginScreen: "LoginScreen",
    ForgotPasswordScreen: "ForgotPasswordScreen",
    OtpVerifyScreen: "OtpVerifyScreen",
    UpdatePasswordScreen: "UpdatePasswordScreen",
    NewRegisterScreen: "NewRegisterScreen",

    // StackScreen
    Root: "Root",
    AddEntityScreen: "AddEntityScreen",
    RouteScreen: "RouteScreen",
    GeofenceScreen: "GeofenceScreen",
    AlarmScreen: "AlarmScreen",
    UserRoleScreen: "UserRoleScreen",
    TrailsScreen: "TrailsScreen",
    PanicScreen: "PanicScreen",
    ReportScreen: "ReportScreen",
    ScheduleReportScreen: "ScheduleReportScreen",
    CreateGeofenceScreen: "CreateGeofenceScreen",
    CreateAlarmScreen: "CreateAlarmScreen",
    AddUserScreen: "AddUserScreen",
    AddRouteAsignScreen: "AddRouteAsignScreen",
    CreateRouteScreen: "CreateRouteScreen",
    AddEntityGroupScreen: "AddEntityGroupScreen",
    AddUserRoleScreen: "AddUserRoleScreen",
    UploadBulkScreen: "UploadBulkScreen",
    PermitViolationScreen: "PermitViolationScreen",

    EditPanicScreen: {
      path: "EditPanicScreen/:sos_id",
      parse: {
        sos_id: (sos_id) => `${sos_id}`
      }
    },
    EditUserScreen: {
      path: "EditUserScreen/:user_id",
      parse: {
        user_id: (user_id) => `${user_id}`
      }
    },
    EditAlarmScreen: {
      path: "EditAlarmScreen/:alarm_id",
      parse: {
        alarm_id: (alarm_id) => `${alarm_id}`
      }
    },
    EditGeofenceScreen: {
      path: "EditGeofenceScreen/:edit_id",
      parse: {
        edit_id: (edit_id) => `${edit_id}`
      }
    },
    EditScheduleReportScreen: {
      path: "EditScheduleReportScreen/:schedule_id",
      parse: {
        schedule_id: (schedule_id) => `${schedule_id}`
      }
    },
    EditRouteAsignScreen: {
      path: "EditRouteAsignScreen/:asign_id",
      parse: {
        asign_id: (asign_id) => `${asign_id}`
      }
    },
    EditEntityScreen: {
      path: "EditEntityScreen/:entity_id",
      parse: {
        entity_id: (entity_id) => `${entity_id}`
      }
    },
    EditEntityGroupScreen: {
      path: "EditEntityGroupScreen/:Group_Id",
      parse: {
        Group_Id: (Group_Id) => `${Group_Id}`
      }
    },
    EditUserRoleScreen: {
      path: "EditUserRoleScreen/:Role_Id",
      parse: {
        Role_Id: (Role_Id) => `${Role_Id}`
      }
    },
    EntityVerifyScreen: {
      path: "EntityVerifyScreen/:verify_id",
      parse: {
        verify_id: (verify_id) => `${verify_id}`
      }
    },

    SearchUserScreen: {
      path: "SearchUserScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },
    SearchRoleScreen: {
      path: "SearchRoleScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },
    SearchAlarmConfigurationScreen: {
      path: "SearchAlarmConfigurationScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },
    SearchAlarmLogScreen: {
      path: "SearchAlarmLogScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },
    SearchRoutesScreen: {
      path: "SearchRoutesScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },
    SearchRoutesAssignScreen: {
      path: "SearchRoutesAssignScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },

    SearchScheduleReportScreen: {
      path: "SearchScheduleReportScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },
    SearchAuditTrailsReportScreen: {
      path: "SearchAuditTrailsReportScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },

    SearchSosScreen: {
      path: "SearchSosScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },
    SearchEntityScreen: {
      path: "SearchEntityScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },
    SearchGroupScreen: {
      path: "SearchGroupScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },
    SearchGeofenceScreen: {
      path: "SearchGeofenceScreen/:search_key",
      parse: {
        search_key: (search_key) => `${search_key}`
      }
    },


    // CitizensStackScreen
    CitizensHomeScreen: "CitizensHomeScreen",
    CitizensReportEmergency: "CitizensReportEmergency",
    CitizensReportPermitViolationScreen: "CitizensReportPermitViolationScreen",
    CitizensAccountScreen: "CitizensAccountScreen",
    CitizensHistory: "CitizensHistory",
    UpdateCitizensOtpVerifyScreen: "UpdateCitizensOtpVerifyScreen",

    // BottomStackScreen
    HomeScreen: "HomeScreen",
    TrackScreen: "TrackScreen",
    MangeScreen: "MangeScreen",
    MessageScreen: "MessageScreen",
    AccountScreen: "AccountScreen",
  },
};

const linking = {
  prefixes: ["TrackoLet://app"],
  config,
};

export default linking;