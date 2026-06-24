package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** Parameters for boost style operations. */
public final class BoostStyleParams {
  private final String description;

  private BoostStyleParams(Builder builder) {
    this.description = builder.description;
  }

  /** Creates a new BoostStyleParams builder. */
  public static Builder builder() {
    return new Builder();
  }

  /** Returns the RunAPI action key for this request. */
  public String action() {
    return "suno/boost-style";
  }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("description", SunoParamUtils.wireValue(description));
    return SunoParamUtils.compact(raw);
  }



  /** Builder for {@link BoostStyleParams}. */
  public static final class Builder {
    private String description;

    private Builder() {}

    /** Sets the item description. */
    public Builder description(String value) {
      this.description = SunoParamUtils.requireNonBlank(value, "description");
      return this;
    }

    /** Builds immutable boost style parameters. */
    public BoostStyleParams build() {
      return new BoostStyleParams(this);
    }
  }
}
