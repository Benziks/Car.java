package coursework;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class DBAccess {

    /**
     * Запись в файл автомобилей
     * @param cars автомобили
     * @throws IOException файл недоступен
     */
    public static void SaveInDB(List<Car> cars) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(new File("db/db.json"), cars);
    }

    /**
     * Считать с файла автомобили
     * @return список автомобилей
     * @throws IOException файл недоступен
     */
    public static ArrayList<Car> LoadFromDB() throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(new File("db/db.json"), ArrayList.class);
    }
}
