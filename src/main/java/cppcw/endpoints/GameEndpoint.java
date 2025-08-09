package cppcw.endpoints;

import cppcw.domain.Greeting;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameEndpoint {

    @GetMapping(path = "/")
    Greeting greeting() {
        return new Greeting("Hello");
    }
}
