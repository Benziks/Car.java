package coursework;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.util.ArrayList;

public class Processing {
    /**
     * Считывание автомобилей с файла в строку
     * @return автомобили
     * @throws IOException файл недоступен
     */
    public static String show() throws IOException {
        try {
            return new BufferedReader(new FileReader(new File("db/db.json"))).readLine();
        } catch (IOException e) {
            System.out.println("База данных недоступна");
        }
        return "{\"showed_successfully\": false}";
    }

    /**
     * Добавление нового автомобиля в базу данных
     * @param carJSON
     * @return JSON-ответ
     * @throws IOException файл хранилища недоступен
     */
    public static String add(String carJSON) throws IOException, IllegalArgumentException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Car car = objectMapper.readValue(carJSON, Car.class);
            Main.getCars().add(car);
            DBAccess.SaveInDB(Main.getCars().getCarsList());
            return "{\"added_successfully\": true}";
        } catch (Exception e) {
            System.out.println("Заданы неправильные данные автомобиля");
            return "{\"added_successfully\": false}";
        }
    }

    public static String edit(String carJSON) throws IOException, IllegalArgumentException {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode carJsonNode = objectMapper.readTree(carJSON);
            int id = Integer.parseInt(carJsonNode.get("id").asText());
            Car car = objectMapper.treeToValue(carJsonNode.get("car"), Car.class);
            Main.getCars().set(id, car);
            DBAccess.SaveInDB(Main.getCars().getCarsList());
            return "{\"edited_successfully\": true}";
        } catch (Exception e) {
            System.out.println("Заданы неправильные данные автомобиля для редактирования");
            return "{\"added_successfully\": false}";
        }
    }

    public static String delete(String ListJSON) throws IOException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Main.getCars().setCarsList(objectMapper.readValue(ListJSON, ArrayList.class));
            DBAccess.SaveInDB(Main.getCars().getCarsList());
            return "{\"deleted_successfully\": true}";
        } catch (IOException e) {
            System.out.println("База данных недоступна");
            return "{\"deleted_successfully\": false}";
        }
    }
}
