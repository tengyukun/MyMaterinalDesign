package com.tyk.mymaterinaldesign;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebViewClient;

import com.tyk.mymaterinaldesign.view.ScrollWebView;

import org.xutils.view.annotation.ViewInject;
import org.xutils.x;

public class WebViewActivity extends AppCompatActivity {

    @ViewInject(R.id.swv_text_content)
    private ScrollWebView swv_text_content;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);

        x.view().inject(this);

        swv_text_content.loadUrl("file:///android_asset/text4/index.html");
        swv_text_content.getSettings().setJavaScriptEnabled(true);
        swv_text_content.setWebViewClient(new WebViewClient());

    }
}
