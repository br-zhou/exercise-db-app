const notificationsTable = require("./../tables/NotificationsTable");

const createRoutes = (router) => {
    router.post("/notifications-table", async (req, res) => {
        const id = req.body.userid; 
        console.log(id);
        const notificationContent = await notificationsTable.fetchUserNotifications(id);
        res.json(notificationContent);
    });
}

module.exports = createRoutes;