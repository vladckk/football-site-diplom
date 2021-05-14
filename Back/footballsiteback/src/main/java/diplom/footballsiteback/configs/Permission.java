package diplom.footballsiteback.configs;

public enum Permission {
    PERMISSION_READ("permission:read"), PERMISSION_WRITE("permission:write"),
    PERMISSION_COMMENT("permission:comment");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
