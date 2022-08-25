package io.coursemela.coursemela.video.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ViewLogStatDTO {
    private Long totalVideWatched;
    private Double totalDurationWatched;

    @Builder.Default
    private Long totalQuizAttempted = 0L;
    @Builder.Default
    private Double performanceScore = 0.0;
}
