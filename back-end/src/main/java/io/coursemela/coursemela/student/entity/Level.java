package io.coursemela.coursemela.student.entity;

public enum Level {
    ELEVEN, TWELVE, ADMISSION, NONE;

    public static Level getLebel(String level) {
        if (level.equalsIgnoreCase("eleven")) return ELEVEN;
        if (level.equalsIgnoreCase("TWELVE")) return TWELVE;
        if (level.equalsIgnoreCase("ADMISSION")) return ADMISSION;
        else return NONE;
    }
}
