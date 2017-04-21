package com.tyk.mymaterinaldesign;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;

import org.xutils.view.annotation.ViewInject;
import org.xutils.x;

public class ImageActivity extends AppCompatActivity {

    private String img;

    @ViewInject(R.id.iv_image_content)
    private ImageView iv_image_content;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_image);
        img = getIntent().getStringExtra("img");

        x.view().inject(this);

        initView();

    }

    private void initView() {
        x.image().bind(iv_image_content,img);

    }
}


