# CAD地图上打poi点

```js
 <img-slider
    :range="range"
    :max="MAX_SCALE"
    :min="MIN_SCALE"
    :step="STEP"
    :is-disabled="isAdding"
    @updateRange="updateRange"
/>
<div
    ref="mapContainer"
    class="map-container w-full h-full overflow-hidden relative"
    @mousewheel.prevent="handleMouseWheel"
>
    <div
        ref="cadContainer"
        class="cad-container"
        :style="`
        position: absolute;
        width: ${cadWidth}px;
        height: ${cadHeight}px;
        left: ${cadLeft}px;
        top: ${cadTop}px;
        transform: translate(-50%, -50%)`"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
        @mousemove="handleMouseMove"
    >
        <img
            ref="cad"
            :src="cadUrl"
            draggable="false"
            class="cad"
            @load="cadLoaded"
        />

        {/* poi渲染 */}
        <div
            v-for="item in displayPoiList"
            :key="item.id"
            :class="`point${item.poiId}`"
            class="point-single absolute"
            :style="{
                left: item.posX / cadScale - POI_LEFT_DEVIATION + 'px',
                bottom: item.posZ / cadScale + 'px',}"
        >
            <point-view
                :info="item"
                :is-adding="
                    displayPoiList[displayPoiList.length - 1].poiId === '0'
                "
                :is-dragging="isDragging"
                :quick-create="quickCreate"
                :show-detail="showDetail"
                :cancel-drag="cancelDrag"
                @changePos="changePos"
                @cancelPos="cancelPos"
                @confirmPos="confirmPos"
                @poiDetail="poiDetail"
                @poiDel="poiDel"
                @togglePoi="togglePoi"
                @createPoiHandle="createPoiHandle"
                @cancelPoiHandle="cancelPoiHandle"
                @isDragging="startDrag"
                >
            </point-view>
        </div>
    </div>
</div>
```


mapContainer：容器，`relative w-full h-full overflow-hidden`
    cadContainer：`absolute `
        `transform: translate(-50%, -50%)`
        宽高为cad图的，随着cad图缩放来改变
        left：
        top：

```js
// 坐标转换：屏幕坐标 → CAD原始坐标
const cadX = (mouseX - this.cadLeft + this.cadWidth * this.cadScale / 2) / this.cadScale;
const cadZ = (this.cadTop + this.cadHeight * this.cadScale / 2 - mouseY) / this.cadScale;
```