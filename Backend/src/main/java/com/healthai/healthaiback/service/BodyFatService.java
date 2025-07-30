package com.healthai.healthaiback.service;

import com.healthai.healthaiback.model.BodyFat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
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

            if (response.getStatusCode() != HttpStatus.OK) {
                throw new Exception("Failed to get prediction from Python API. Status code: " + response.getStatusCode());
            }
            if (response.getBody() == null) {
                throw new Exception("No response body received from Python API.");
            }

            response.getBody().setPredicted_body_fat(Math.floor(response.getBody().getPredicted_body_fat()));
            return response.getBody();

        } catch (Exception e) {
            BodyFat errorResult = new BodyFat();
            errorResult.setPredicted_body_fat(-1.0); // flag value
            return errorResult;
        }


    }
}
