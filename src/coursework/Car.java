package coursework;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Car implements Serializable {
    private String registrationNumber;
    private String brand;
    private int releaseDate;
    private String color;
    private String ownerFullName;
    private String ownerAddress;

    public String getRegistrationNumber() {
        return registrationNumber;
    }
    public String getBrand() {
        return brand;
    }
    public int getReleaseDate() {
        return releaseDate;
    }
    public String getColor() {
        return color;
    }
    public String getOwnerFullName() {
        return ownerFullName;
    }
    public String getOwnerAddress() {
        return ownerAddress;
    }

    public Car(String registrationNumber, String brand, int releaseDate, String color,
               String ownerFullName, String ownerAddress) throws IllegalArgumentException {
        try {
            this.setRegistrationNumber(registrationNumber);
            this.setBrand(brand);
            this.setReleaseDate(releaseDate);
            this.setColor(color);
            this.setOwnerFullName(ownerFullName);
            this.setOwnerAddress(ownerAddress);
        } catch (Exception e) {
            throw new IllegalArgumentException("Неправильные данные автомобиля");
        }
    }
    public Car(){}

    public void setRegistrationNumber(String registrationNumber) throws IllegalArgumentException {
        if (Checkers.firstLetterCase(registrationNumber) && registrationNumber.length() > 6
                && registrationNumber.length() < 10) {
            this.registrationNumber = Checkers.removeExtraSpaces(registrationNumber);
        } else {
            throw new IllegalArgumentException("Регистрационный номер должен начинаться с большой буквы и быть длиной от 6 до 10 символов");
        }
        this.registrationNumber = registrationNumber;
    }

    public void setBrand(String brand) {
        if (Checkers.firstLetterCase(brand) && brand.length() < 30) {
            this.brand = Checkers.removeExtraSpaces(brand);
        } else {
            throw new IllegalArgumentException("Марка автомобиля должна начинаться с большой буквы и быть длиной меньше 30 символов");
        }
    }

    public void setReleaseDate(int releaseDate) {
        if (releaseDate > 1900 && releaseDate < 2023) {
            this.releaseDate = releaseDate;
        } else {
            throw new IllegalArgumentException("Год выпуска должен быть между 1900 и 2023");
        }
    }

    public void setColor(String color) {
        if (Checkers.firstLetterCase(color) && color.length() < 30) {
            this.color = Checkers.removeExtraSpaces(color);
        } else {
            throw new IllegalArgumentException("Цвет автомобиля должен начинаться с большой буквы и быть длиной меньше 30 символов");
        }
    }

    public void setOwnerFullName(String ownerFullName) {
        if (Checkers.firstLetterCase(ownerFullName) && ownerFullName.length() < 30) {
            this.ownerFullName = Checkers.removeExtraSpaces(ownerFullName);
        } else {
            throw new IllegalArgumentException("ФИО должно начинаться с большой буквы и быть длиной меньше 30 символов");
        }
    }

    public void setOwnerAddress(String ownerAddress) {
        if (Checkers.firstLetterCase(ownerAddress) && ownerAddress.length() < 30) {
            this.ownerAddress = Checkers.removeExtraSpaces(ownerAddress);
        } else {
            throw new IllegalArgumentException("Адрес владельца авто должен начинаться с большой буквы и быть длиной меньше 30 символов");
        }
    }

    @Override
    public String toString() {
        return "Car{" +
                "registrationNumber='" + registrationNumber + '\'' +
                ", brand='" + brand + '\'' +
                ", releaseDate=" + releaseDate +
                ", color='" + color + '\'' +
                ", ownerFullName='" + ownerFullName + '\'' +
                ", ownerAddress='" + ownerAddress + '\'' +
                '}';
    }
}
