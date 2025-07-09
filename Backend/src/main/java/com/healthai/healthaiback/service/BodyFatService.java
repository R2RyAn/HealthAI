package com.healthai.healthaiback.service;

import com.healthai.healthaiback.model.BodyFat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class BodyFatService {

    @Autowired
    private RestTemplate restTemplate;

    public BodyFat getPrediction(MultipartFile file) {
        try {
            String pythonApiUrl = "http://localhost:8000/predict";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<BodyFat> response = restTemplate.exchange(
                    pythonApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    BodyFat.class
            );

            return response.getBody();

        } catch (Exception e) {
            e.printStackTrace();
            BodyFat errorResult = new BodyFat();
            errorResult.setPredicted_body_fat(-1.0); // flag value
            return errorResult;
        }
    }
}
