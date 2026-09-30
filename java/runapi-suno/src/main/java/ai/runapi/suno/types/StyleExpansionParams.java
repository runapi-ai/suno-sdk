package ai.runapi.suno.types;

import java.util.LinkedHashMap;
import java.util.Map;

/** Parameters for expanding a style description. */
public final class StyleExpansionParams {
  private final String description;

  private StyleExpansionParams(Builder builder) { this.description = builder.description; }

  /** Creates a new StyleExpansionParams builder. */
  public static Builder builder() { return new Builder(); }

  /** Returns the RunAPI contract key for this request. */
  public String action() { return "suno/style-expansions"; }

  /** Converts these parameters to the JSON request body shape. */
  public Map<String, Object> toMap() {
    Map<String, Object> raw = new LinkedHashMap<String, Object>();
    raw.put("description", SunoParamUtils.wireValue(description));
    return SunoParamUtils.compact(raw);
  }

  /** Builder for {@link StyleExpansionParams}. */
  public static final class Builder {
    private String description;
    private Builder() {}

    /** Sets the style description to expand. */
    public Builder description(String value) {
      this.description = value;
      return this;
    }

    /** Builds immutable style expansion parameters. */
    public StyleExpansionParams build() { return new StyleExpansionParams(this); }
  }
}
