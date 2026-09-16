package ai.runapi.suno.types;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Objects;

/** Availability of a RunAPI-owned resource. */
public final class ResourceStatus {
  public static final ResourceStatus AVAILABLE = new ResourceStatus("available");
  public static final ResourceStatus FAILED = new ResourceStatus("failed");

  private final String value;

  /** Creates a resource status from its wire value. */
  @JsonCreator
  public ResourceStatus(String value) {
    String checked = Objects.requireNonNull(value, "value").trim();
    if (checked.isEmpty()) throw new IllegalArgumentException("value must not be blank");
    this.value = checked;
  }

  /** Returns the raw status value. */
  @JsonValue
  public String value() { return value; }

  @Override public String toString() { return value; }
  @Override public boolean equals(Object other) {
    return other instanceof ResourceStatus && value.equals(((ResourceStatus) other).value);
  }
  @Override public int hashCode() { return value.hashCode(); }
}
