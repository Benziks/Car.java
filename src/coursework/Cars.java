package coursework;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Cars implements Serializable {
    private ArrayList<Car> carsList;

    public Cars() {
        carsList = new ArrayList<>();
    }
    public ArrayList<Car> getCarsList() {
        return carsList;
    }

    public void setCarsList(ArrayList<Car> carsList){
        this.carsList = carsList;
    }

    /**
     * Добавить новый автомобиль в список
     * @param car автомобиль
     */
    public void add(Car car){
        carsList.add(car);
    }

    /**
     * Изменить автомобиль в списке
     * @param id порядковый номер автомобиля
     * @param car автомобиль
     */
    public void set(int id, Car car){
        carsList.set(id, car);
    }

    /**
     * Удалить автомобиль из списка
     * @param car автомобиль
     */
    public void remove(Car car){
        carsList.remove(car);
    }

    /**
     * Удаление автомобиля из списка по номеру
     * @param id номер автомобиля в списке
     */
    public void remove(int id) throws IllegalArgumentException {
        if (id < carsList.size() && id >= 0){
            carsList.remove(id);
        } else {
            throw new IllegalArgumentException("Некорректный индекс автомобиля к удалению");
        }
    }

    @Override
    public String toString() {
        return "Cars{" +
                "carsList=" + carsList +
                '}';
    }
}
