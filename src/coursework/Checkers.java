package coursework;

public class Checkers {
    /**
     * Проверка первой буквы на заглавность
     * @param str строка
     * @return заглавная ли первая буква
     */
    public static boolean firstLetterCase(String str) {
        if (str.length() < 1)
            return false;
        if (Character.isUpperCase(str.charAt(0)))
            return true;
        return false;
    }

    /**
     * Очистка строки от лишних пробелов
     * @param string строка
     * @return строка без двойных пробелов внутри и пробелов снаружи
     */
    public static String removeExtraSpaces(String string){
        return string.trim().replaceAll(" +", " ");
    }
}
