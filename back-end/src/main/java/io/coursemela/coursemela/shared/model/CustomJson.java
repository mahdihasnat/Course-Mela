package io.coursemela.coursemela.shared.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.coursemela.coursemela.shared.converter.CustomJsonDeserializer;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@JsonDeserialize(using = CustomJsonDeserializer.class)
@Getter
public class CustomJson {
    JsonNode jsonNode;

    public CustomJson(JsonNode jsonNode) {
        this.jsonNode = jsonNode;
    }

    @Override
    public String toString() {
        return "CustomJson{" +
                "jsonNode=" + jsonNode +
                '}';
    }
}
