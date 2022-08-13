package io.coursemela.coursemela.shared.converter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import io.coursemela.coursemela.shared.model.CustomJson;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
public class CustomJsonDeserializer extends StdDeserializer<CustomJson> {
    protected CustomJsonDeserializer() {
        super(CustomJson.class);
    }

    @Override
    public CustomJson deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = jp.getCodec().readTree(jp);
        return new CustomJson(node);
    }
}
