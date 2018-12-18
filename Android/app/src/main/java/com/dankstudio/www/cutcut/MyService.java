package com.dankstudio.www.cutcut;

import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import okhttp3.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class MyService extends Service {
    public MyService() {
    }

    private String SSID = null;
    public void setSSID(String ssid){
        SSID = ssid;
        requestNews();
    }

    //connect using binder
    private final IBinder binder = new MyBinder();
    class MyBinder extends Binder {
        MyService getService() {
            return MyService.this;
        }
    }
    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        //new KeepAsking().run();
    }

    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    OkHttpClient okHttpClient = new OkHttpClient();

    private JSONObject last = null;

    public void requestNews(){
        try {
            get("http://182.254.137.228:3000/list",
                    new Callback()
                    {
                        @Override
                        public void onFailure(Call call, IOException e) {
                            Log.e("MY", "request error!");
                            e.printStackTrace();
                        }

                        @Override
                        public void onResponse(Call call, Response response) throws IOException {
                            String result = response.body().string();
                            JSONObject jsonResult = null;
                            JSONArray news = null;
                            try {
                                jsonResult = new JSONObject(result);
                                news = jsonResult.getJSONArray("news");
                                JSONObject latest = news.getJSONObject(0);
                                if(latest!=null && latest!=last){
                                    last = latest;
                                    notification();
                                }
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                        }
                    });
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    void get(String url, Callback cb) throws IOException {
        Request request = new Request.Builder().url(url).addHeader("Cookie", "SessionID="+SSID).build();
        //new call
        Call call =okHttpClient.newCall(request);
        //请求加入调度
        call.enqueue(cb);
    }

    private int num = 0;

    private void notification(){
        NotificationCompat.Builder nb = new NotificationCompat.Builder(this);
        nb.setContentTitle("CutCut");
        //设置小图标
        nb.setSmallIcon(R.drawable.icon);
        String title = "快来看啊";
        try {
            if(last!=null){
                title = last.getString("title");
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        nb.setContentText(title);
        nb.setWhen(System.currentTimeMillis());

        NotificationManager manager = (NotificationManager)getSystemService(Service.NOTIFICATION_SERVICE);
        num++;
        manager.notify(num, nb.build());
    }

    class KeepAsking extends Thread{
        private boolean flag = true;

        public void run(){
            while (flag){
                requestNews();
                try {
                    sleep(3600*1000);
                } catch (InterruptedException e) {
                    flag = false;
                    e.printStackTrace();
                }
            }
        }
    }

    public void debug(){
        setSSID("s%3AG6GIjFPVPM2Uugr7KuBegryxQnLd7-XK.0sfj%2FQRt8n18LhvPdguS%2FoKhv4o%2B3qLasCGXEjVovBo");
        requestNews();
    }


}
