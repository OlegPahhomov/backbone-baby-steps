import java.sql.SQLException;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.SparkBase.staticFileLocation;

public class Application {

    public static void main(String[] args) throws SQLException {
        port(8080);
        //port(getHerokuAssignedPort());
        staticFileLocation("/webapp");
    }

    static int getHerokuAssignedPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 4567;
    }

}
