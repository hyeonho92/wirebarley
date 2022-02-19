package com.wireBarley.WireBarley.service;

import com.wireBarley.WireBarley.model.MainModel;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DecimalFormat;
import java.util.HashMap;

@Service
public class MainService {

    public MainModel getCurrency(String inputCurrency, Integer inputMoney) throws ParseException {

        MainModel result = new MainModel();

        StringBuffer jsonStr = new StringBuffer();

        try {
            StringBuilder urlBulider = new StringBuilder("http://api.currencylayer.com/live?access_key=586a788bc6724fab444b5c2e0ef4e6e0");
            URL url = new URL(urlBulider.toString());

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            BufferedReader bfr;

            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                bfr = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            } else {
                bfr = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }

            String line;

            while ((line = bfr.readLine()) != null) {
                jsonStr.append(line + "\n");
            }
            bfr.close();
            conn.disconnect();


        } catch (Exception e) {
            e.printStackTrace();

        }

        JSONParser parser = new JSONParser();
        Object obj;
        obj = parser.parse(jsonStr.toString());
        JSONObject jsonObj = (JSONObject)obj;

        System.out.println(jsonObj);

        HashMap<String, String> code = (HashMap<String, String>) jsonObj.get("quotes");

        for(String key : code.keySet()) {
            if (key.equals("USD"+inputCurrency)) {
                result.setBasicCurrency(String.valueOf(code.get(key)));

                BigDecimal changeMoney = new BigDecimal(result.getBasicCurrency()).multiply(new BigDecimal(inputMoney));

                DecimalFormat decFormat = new DecimalFormat("###,###.##");
                String m = decFormat.format(changeMoney);
                result.setChangeMoney(m);
            }
        }

        return result;
    }

}
